class Router {
  constructor(options) {
    this._routes = options.routes;

    this.prefix = "";
    this.routeHistory = [];
    this.currentIndex = -1;
    this.currentUrl = "";

    this.changeFlag = true;

    this._init();
  }

  static getPath() {
    const [, /* prefix */ path] = window.location.href.split(".html");
    return path || "/";
  }

  _init() {
    const [prefix] = window.location.href.split(".html");
    this.prefix = `${prefix}.html`;

    window.addEventListener("load", this.refresh.bind(this), false);
    window.addEventListener("popstate", this.refresh.bind(this), false);
  }

  refresh(e) {
    if (this.changeFlag) {
      this.currentUrl = Router.getPath();
      this.routeHistory.push(this.currentUrl);
      this.currentIndex++;
    } else {
      this.changeFlag = true;
    }

    let currentComponentName = "";
    let nodeList = document.querySelectorAll("[data-component-name]");

    for (let i = 0; i < this._routes.length; i++) {
      if (this._routes[i].path === this.currentUrl) {
        currentComponentName = this._routes[i].name;
        break;
      }
    }

    nodeList.forEach((node) => {
      if (node.getAttribute("data-component-name") === currentComponentName) {
        node.classList.add("active");
      } else {
        node.classList.remove("active");
      }
    });
  }

  push(options) {
    if (options.path) {
      window.history.pushState({ path }, "", `${this.prefix}${path}`); // 单页应用中使用 history.state 中保存的 { path: /xxx } 去加载对应路由
      this.refresh();
    } else if (options.name) {
      let path = "";
      for (let i = 0; i < this._routes.length; i++) {
        if (this._routes[i].name === options.name) {
          path = this._routes[i].path;
          break;
        }
      }
      if (path) {
        window.history.pushState({ path }, "", `${this.prefix}${path}`);
        this.refresh();
      }
    }
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
