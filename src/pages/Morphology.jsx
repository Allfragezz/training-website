function Morphology() {
  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p>Бобри - великі водоплавні гризуни з густим коричневим хутром. Вони мають широкі, лускаті хвости, які слугують для керування під час плавання, а також великі передні зуби для гризіння деревини.</p>
        </section>
        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
            <li>Довжина тіла бобра становить 90-120 см, хвіст - близько 30 см, вага - 18-30 кг.</li>
            <li>Мають перетинки між пальцями задніх лап, що робить їх чудовими плавцями.</li>
            <li>Передні зуби - різці - постійно ростуть і мають помаранчевий колір через вміст заліза в емалі.</li>
          </ul>
        </section>
        <figure className="text-center">
          <img src="/images/1619px-biber-inn-kiefersfelden-3jpg.webp" alt="Бобер в траві" className="img-fluid rounded my-4"/>
          <figcaption className="text-muted">Бобер в траві</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;