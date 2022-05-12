import PropTypes from "prop-types";

function TemplateBase({ children }) {
  return (
    <div className="grid grid-cols-2 h-full w-full">
      <section className="flex justify-center items-center ">
        {children}
      </section>
      <section className="bg-blue-900 flex  justify-center items-center text-center">
        <article className="p-20">
          <img
            className=" rounded-2xl mb-8 object-contain"
            src="https://empresas.blogthinkbig.com/wp-content/uploads/2019/10/big-data-politica.jpeg?w=800"
            alt="voto"
          />
          <h2 className="text-xl mb-4 font-bold text-white">
            Convierte tus votaciones en algo facil y rapido
          </h2>
          <p className="text-sm mb-8 font-light text-white">
            con un simple click crea votaciones y guardalas para tener un
            rastreo de estas, nuestro sistema te permite en tiempo real dar a
            conocer los resultados{" "}
          </p>
        </article>
      </section>
    </div>
  );
}

TemplateBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplateBase;
