# Directory data model

Planning document for the directory backend. **Nothing here has been applied.**
No Supabase project has been created, no migration has been run, and no
credentials exist in this repository. The schema below is a design to review
before any of that happens.

The site currently reads from typed local data in `lib/directory/data.ts`. The
field names there match the column names below so the swap is mechanical.

## Tables

### `providers`

One row per practice or organization.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `slug` | `text` unique | URL segment for `/providers/[slug]` |
| `name` | `text` | Practice name as the practice writes it |
| `description` | `text` | Original copy, not scraped |
| `service_area_note` | `text` | Free text; no coverage claims |
| `telehealth` | `boolean` | |
| `website` | `text` nullable | https only, validated before display |
| `phone` | `text` nullable | |
| `referral_status` | `text` nullable | `accepting` / `waitlist` / `not-accepting` |
| `referral_source` | `text` nullable | How the status was established |
| `referral_last_confirmed` | `date` nullable | |
| `last_confirmed` | `date` nullable | Whole record |
| `is_published` | `boolean` | Default `false` |
| `consent_on_file` | `boolean` | Default `false` |
| `created_at` / `updated_at` | `timestamptz` | |

Two constraints carry product rules into the database rather than leaving them
to the UI:

```sql
-- A referral status may only exist alongside its source and date.
alter table providers add constraint referral_claim_is_sourced check (
  referral_status is null
  or (referral_source is not null and referral_last_confirmed is not null)
);

-- Nothing is publishable without the provider's consent on file.
alter table providers add constraint publish_requires_consent check (
  is_published = false or consent_on_file = true
);
```

### `provider_locations`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `provider_id` | `uuid` FK → `providers.id` on delete cascade | |
| `street_address` | `text` nullable | Often withheld |
| `city` | `text` | |
| `state` | `text` | |
| `postal_code` | `text` | |
| `is_primary` | `boolean` | |

### `provider_services`

Join table. One row per service a provider offers.

| Column | Type | Notes |
|---|---|---|
| `provider_id` | `uuid` FK, part of PK | |
| `service_type` | `text` FK → `service_types.id`, part of PK | |
| `age_groups` | `text[]` | Subset of the age-group vocabulary |

Service types and age groups stay as small reference tables rather than enums,
so vocabulary can change without a migration.

### `listing_claims`

A practice asserting ownership of a listing, or asking for a correction.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `provider_id` | `uuid` FK nullable | Null when claiming something not yet listed |
| `claimant_name` | `text` | |
| `claimant_email` | `text` | |
| `claimant_role` | `text` | |
| `message` | `text` | |
| `status` | `text` | `new` / `in_review` / `approved` / `rejected` |
| `created_at` | `timestamptz` | |

### `lead_requests`

A visitor asking to be connected with a provider. Not built yet, and it should
not be until there is a stated retention period and a privacy policy that
covers it — this is the only table that would hold anything resembling health
information about an identifiable person.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `provider_id` | `uuid` FK | |
| `contact_name` | `text` | |
| `contact_email` | `text` | |
| `contact_phone` | `text` nullable | |
| `message` | `text` nullable | Keep optional and clearly labeled |
| `status` | `text` | `new` / `sent` / `closed` |
| `created_at` | `timestamptz` | |
| `expires_at` | `timestamptz` | Drives scheduled deletion |

### `content_resources`

External organizations and material shown on `/resources`.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `title` | `text` | |
| `url` | `text` | https, checked before publication |
| `attribution` | `text` | Who publishes it |
| `summary` | `text` | Original copy |
| `category` | `text` nullable | |
| `is_published` | `boolean` | Default `false` |
| `last_checked` | `date` nullable | Link-rot check |

## Row-level security plan

RLS is enabled on every table. The public site uses the anon key and must never
be able to read anything unpublished or anything a person submitted.

| Table | anon select | anon insert | anon update/delete |
|---|---|---|---|
| `providers` | only `is_published = true` | no | no |
| `provider_locations` | only via a published provider | no | no |
| `provider_services` | only via a published provider | no | no |
| `content_resources` | only `is_published = true` | no | no |
| `listing_claims` | **no** | rate-limited insert only | no |
| `lead_requests` | **no** | rate-limited insert only | no |

Sketch:

```sql
alter table providers enable row level security;

create policy "published providers are readable"
  on providers for select
  to anon
  using (is_published = true);

-- Child rows inherit their parent's visibility.
create policy "locations of published providers are readable"
  on provider_locations for select
  to anon
  using (exists (
    select 1 from providers p
    where p.id = provider_locations.provider_id and p.is_published = true
  ));

-- Submissions are write-only for the public: insert allowed, select denied.
alter table listing_claims enable row level security;

create policy "anyone may submit a claim"
  on listing_claims for insert
  to anon
  with check (true);
-- Deliberately no select policy for anon, so nobody can read others' submissions.
```

Notes that matter more than the SQL:

- **Write-only is not the same as private.** Insert-only policies stop reads
  through the API, but anything inserted still sits in the database. For
  `lead_requests` that means a retention period and a scheduled delete, decided
  before the table is created.
- **Service-role keys never reach the browser.** Any admin read path runs
  server-side only.
- **Rate limiting belongs in front of the insert policies**, or the claim and
  lead tables become a spam target.
- **`is_published` defaults to `false`** so a partial record cannot leak by
  being saved early.

## Migration path from local data

1. Create the tables and reference vocabularies.
2. Enable RLS and add the policies above *before* inserting any row.
3. Move `lib/directory/data.ts` behind an async `getProviders()` that reads
   from the database; the component props do not change.
4. Delete the example records once real listings exist — they exist only to
   demonstrate the interface.
