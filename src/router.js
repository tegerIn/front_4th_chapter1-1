export default function routerFunc() {
  const routes = {
    "/": "HomePage",
    "/login": "LoginPage",
    "/profile": "ProfilePage",
  };

  const router = {
    addRouter(path, page) {
      routes[path] = page;
      return this;
    },

    navigatorTo(path) {
      history.pushState("", "", path);
      this.handleRoute(path);
    },

    handleRoute(path) {
      if (path === "#") {
        localStorage.removeItem("user");
        localStorage.setItem("isLoggedIn", false);
        path = "/login";
        this.navigatorTo(path);
      }
      if (
        path === "/profile" &&
        localStorage.getItem("isLoggedIn") !== "true"
      ) {
        path = "/login";
        this.navigatorTo(path);
      }
      let handler = routes[path];
      if (handler) {
        document.getElementById("root").innerHTML = handler();
      } else {
        const errorPage = routes["/error"];
        if (errorPage) {
          document.getElementById("root").innerHTML = errorPage();
        }
      }
    },

    navigatorPop() {
      this.handleRoute(window.location.pathname);
      window.removeEventListener("popstate", this.onPopState);
      window.addEventListener("popstate", this.onPopState);
    },

    onPopState() {
      router.handleRoute(window.location.pathname);
    },
  };
  return router;
}
