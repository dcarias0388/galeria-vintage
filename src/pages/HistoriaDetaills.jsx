import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import cuadroVintage from "../assets/images/vintage.jpg";
import tecnicas from "../assets/images/tecnicas.webp";

function HistoriaDetaills() {
  return (
    <React.Fragment>
      <header className="mt-0 pt-0 pb-0">
        <Navbar />
      </header>
      <div className="history-body mb-4">
        <div className="container bg-white mb-4">
          <h3 className="mt-4">Arte Vintage</h3>
          <p>
            Se trata de una palabra inglesa que puede traducirse como{" "}
            <b>“vendimia”</b>, aunque se utiliza en nuestro idioma para designar
            a los <b>objetos antiguos de diseño artístico y buena calidad.</b>{" "}
            Hoy en día se habla de vintage como un estilo retro o clásico. Las
            creaciones vintage intentan recrear o imitar productos antiguos que
            siguen siendo valorados.
          </p>
          <p>
            La principal utilización de la técnica <b>vintage</b> en las
            pinturas, es para hablar de manera muy directa de todas aquellas
            obras de artes que llevan alrededor de más de 20 años de edad, al
            igual que su significado, historia y calidad a la vista de cada uno
            de los amantes del arte, convirtiéndose en la actualidad como una de
            las mejores decoraciones que capta la atención de sus admiradores.
            Aunque muchas personas hoy en día han confundido el concepto de
            Vintage y retro en las pinturas, al obtener y contar con la
            información y datos necesarios, se lograra separar cada uno de ellos
            y por consiguiente abrir camino a la mejor calidad de las pinturas,
            con mucho más talento y habilidad.
          </p>
          <div className="d-flex justify-content-center">
            <figure>
              <img
                style={{ width: "400px" }}
                src={cuadroVintage}
                alt="Cuadro Vintage"
              />
              <figcaption>Cuadro de estilo Vintage</figcaption>
            </figure>
          </div>
          <p>
            <b>
              <i>
                ¿Cuáles son las técnicas utilizadas en las pinturas Vintage?
              </i>
            </b>
          </p>
          <p>
            <ol>
              <b>
                <li>Gran imaginación y destreza</li>
              </b>
              <p>
                Esta técnica se caracteriza por la utilización de la imaginación
                en cuanto a las obras de artes, ya que así se muestran en ellos
                los sentimientos y emociones de una manera más directa, captando
                por completo la atención del público; y{" "}
                <b>despertando su interés sobre las pinturas Vintage</b>, es
                decir con una serie de años históricos.{" "}
              </p>
              <p>
                La destreza con la que fueron realizadas estas pinturas es una
                de las técnicas también resaltantes a la hora de catalogar estas
                artes como una de la más destacada o impresionante en la
                trayectoria artística de cualquier persona amante y apasionada
                del verdadero arte. Así que te recomiendo que tomes esto en
                consideración.
              </p>
              <b>
                <li>Alteración gráfica</li>
              </b>
              <p>
                Es una de las principales técnicas, debido a que se basa en la
                supervisión de las pinturas, de acuerdo a las alteraciones
                gráficas que sufre las obras de artes por medio de los tiempos,
                tomando de esa manera la mejor calidad y belleza de las mismas,
                al igual que abre camino a las oportunidades de agrado a la
                vista.
              </p>
              <p>
                Es por ello que es importante que tomes en cuenta esta técnica,
                para lograr así el desarrollo de las funciones dentro de las
                pinturas y con eso garantizar la satisfacción de cada una de las
                personas, al igual que tu propio beneficio. Para así obtener
                positivos resultados.
              </p>
              <b>
                <li>Composición</li>
              </b>
              <p>
                Básicamente esta es una de las técnicas utilizadas para estudiar
                la composición de los diseños de cada una de las obras de artes
                y con ellos evaluar la calidad de comprensión de las medidas
                para su elaboración, y que así se pueda hacer presente en los
                mejore recordatorios por cada una de las personas. De esta
                manera, lograr equilibrar el valor de las pinturas, y así hoy
                convertirse en una de las más importantes técnicas para las
                pinturas Vintage, y su desarrollo en los diferentes ámbitos del
                arte.
              </p>
            </ol>
          </p>
          <p>
            <img
              src={tecnicas}
              className="ms-2"
              alt="Técnicas Vintage"
              align="right"
              style={{ width: "300px" }}
            />
            Estas son sólo algunas de las técnicas empleadas en las pinturas
            Vintage, para darle vida y belleza a los cuadros como obras de
            artes, con el objetivo de destacar el realismo en cada uno de ellos;
            para así mantener la calidad brillante y famosa de esas obras que
            han marcado la vida de las personas.
            <br />
            Por eso, si deseas aprender a como considerar una pintura Vintage es
            necesario que comiences a utilizar estas técnicas para que así
            catálogues las pinturas y puedas impulsarte a desarrollar tus
            propias técnicas, en función de incentivar la imaginación, ingenio,
            intelectualidad y otros motores impulsadores.
            <br />
            Para que finalmente puedas desarrollar cada una de tus habilidades
            en cuanto a la pintura como una de los mejores artes para la
            expresión de los sentimientos y emociones en tu vida artística. Por
            eso, es que,
            <b>las técnicas de pintura Vintage</b> es completamente importante,
            dentro del mundo del arte.
          </p>
          <p>
            En los últimos años, todo lo relacionado con el estilo vintage ha
            ido creciendo de manera constante y lo ha hecho más que
            notablemente, permitiéndonos encontrar un gran número de productos
            de este estilo, incluyendo ropa, complementos, objetos de decoración
            para cualquiera de las estancias del hogar u obras de arte
            pictóricas entre otros.
          </p>
          <p>
            De esta forma, si buscamos algún{" "}
            <b>cuadro contemporáneo que pueda ser considerado como vintage</b>,
            estaríamos hablando durante horas y horas. Tan solo hay que buscar
            un poco y nos daremos cuenta que no unos pocos sino un gran número
            de artistas y pintores cuentan con un amplio catálogo de obras de
            este estilo que podría representar sin ningún problema al vintage.
          </p>
          <cite>Fuente: https://dibujoypintura.net</cite>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default HistoriaDetaills;
