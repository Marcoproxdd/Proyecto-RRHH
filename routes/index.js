const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware } = require("../middleware");

module.exports = function ({
  ExampleRoutes,
  DepartamentoRoutes,
  WorkScheduleRoutes,
  PermissionRoutes
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }));

  apiRouter.use("/example", ExampleRoutes);
  apiRouter.use('/departamentos', DepartamentoRoutes); 
  apiRouter.use('/schedules', WorkScheduleRoutes);
  apiRouter.use('/permissions', PermissionRoutes);

  router.use("/v1/api", apiRouter);
  router.use("/", (req, res) => {
    res.send("v.0.1.0.3");
  });

  router.use(ErrorMiddleware);

  return router;
};
