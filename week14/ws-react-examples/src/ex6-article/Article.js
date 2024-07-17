
export default function Article({title, desc}) {
  console.log("Article.render()");

  return (
    <article className="article">
      <h2>{title}</h2>
      {desc}
    </article>
  );
}

