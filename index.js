require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// Database Connection
import ConnectDB from "./database/Connection";

//google authentication config
import googleAuthConfig from "./config/google.config";

//private route authentication config
import privateRouteConfig from "./config/route.config";

//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Orders";
import Review from "./API/Reviews";
import User from "./API/Users";

//passport config
googleAuthConfig(passport);
privateRouteConfig(passport);

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());
//zomato.use(passport.session());

//Application Routes

zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/user", User);

// zomato.get("/", (req, res) => {
//   return res.json({
//     website: "Welcome to the backend api of Zomato-master-clone",
//   });
// });

zomato.listen(4000, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is Working");
    })
    .catch((error) => {
      console.log("Server not responding database not connected");
      console.log(error);
    });
});
