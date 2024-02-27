(async () => {
    try {
      await sequelize.authenticate();
      console.log(`Conexión establecida con éxito a la base de datos.`);
      await sequelize.sync({ force: true });
      console.log(`Base de datos sincronizada.`);
    } catch (error) {
      console.error(`Error al conectar o sincronizar la base de datos: ${error.message}`);
    }
  })();