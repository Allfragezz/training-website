import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Population() {
  return (
    <main className="container px-4 py-4">
      <div className="row">
        <aside className="col-md-3">
          <nav className="sticky-top pt-3" aria-label="Зміст сторінки">
            <h2 className="h4">Зміст</h2>
            <ul className="nav flex-column">
              <a href="#continentsList" className="nav-link" data-bs-toggle="collapse">Континенти</a>
              <a href="#subcontinentsList" className="nav-link" data-bs-toggle="collapse">Субконтиненти</a>
              <a href="#countriesList" className="nav-link" data-bs-toggle="collapse">Країни</a>
              <a href="#biogeographicList" className="nav-link" data-bs-toggle="collapse">Біогеографічні зони</a>
              <a href="#biomesList" className="nav-link" data-bs-toggle="collapse">WWF Біоми</a>
            </ul>
          </nav>
        </aside>

        <article className="col-md-9">
          <h2 className="h2 text-success mb-4">Ареал поширення бобрів</h2>
          
          <section id="continents" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#continentsList" 
                      aria-expanded="false" 
                      aria-controls="continentsList">
                Континенти
              </button>
            </h3>
            <div className="collapse" id="continentsList">
              <ul className="list-group mb-3">
                <li className="list-group-item">Європа</li>
                <li className="list-group-item">Азія</li>
                <li className="list-group-item">Північна Америка</li>
              </ul>
            </div>
          </section>

          <section id="subcontinents" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#subcontinentsList" 
                      aria-expanded="false" 
                      aria-controls="subcontinentsList">
                Субконтиненти
              </button>
            </h3>
            <div className="collapse" id="subcontinentsList">
              <ul className="list-group mb-3">
                <li className="list-group-item">Східна Азія</li>
                <li className="list-group-item">Центральна Азія</li>
              </ul>
            </div>
          </section>

          <section id="countries" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#countriesList" 
                      aria-expanded="false" 
                      aria-controls="countriesList">
                Країни
              </button>
            </h3>
            <div className="collapse" id="countriesList">
              <ul className="list-group mb-3 list-columns">
                <li class="list-group-item">Білорусь</li>
                <li class="list-group-item">Китайська Народна Республіка</li>
                <li class="list-group-item">Франція</li>
                <li class="list-group-item">Німеччина</li>
                <li class="list-group-item">Казахстан</li>
                <li class="list-group-item">Люксембург</li>
                <li class="list-group-item">Монголія</li>
                <li class="list-group-item">Норвегія</li>
                <li class="list-group-item">Росія</li>
                <li class="list-group-item">Австрія</li>
                <li class="list-group-item">Бельгія</li>
                <li class="list-group-item">Хорватія</li>
                <li class="list-group-item">Чехія</li>
                <li class="list-group-item">Данія</li>
                <li class="list-group-item">Естонія</li>
                <li class="list-group-item">Фінляндія</li>
                <li class="list-group-item">Угорщина</li>
                <li class="list-group-item">Італія</li>
                <li class="list-group-item">Латвія</li>
                <li class="list-group-item">Ліхтенштейн</li>
                <li class="list-group-item">Литва</li>
                <li class="list-group-item">Чорногорія</li>
                <li class="list-group-item">Нідерланди</li>
                <li class="list-group-item">Польща</li>
                <li class="list-group-item">Румунія</li>
                <li class="list-group-item">Сербія</li>
                <li class="list-group-item">Словаччина</li>
                <li class="list-group-item">Словенія</li>
                <li class="list-group-item">Іспанія</li>
                <li class="list-group-item">Швеція</li>
                <li class="list-group-item">Швейцарія</li>
                <li class="list-group-item">Україна</li>
                <li class="list-group-item">Болгарія</li>
              </ul>
            </div>
          </section>

          <section id="biogeographic" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#biogeographicList" 
                      aria-expanded="false" 
                      aria-controls="biogeographicList">
                Біогеографічні зони
              </button>
            </h3>
            <div className="collapse" id="biogeographicList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Палеарктика</li>
              </ul>
            </div>
          </section>

          <section id="biomes" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#biomesList" 
                      aria-expanded="false" 
                      aria-controls="biomesList">
                Біоми WWF
              </button>
            </h3>
            <div className="collapse" id="biomesList">
              <ul className="list-group">
                <li class="list-group-item">Помірні широколистяні та мішані ліси</li>
                <li class="list-group-item">Тайга</li>
                <li class="list-group-item">Хвойні ліси помірної зони</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

export default Population;