export default function EducationalTopicTemplate({ children, title, intro }: any) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{intro}</p>
      {children}
    </div>
  );
}
