class Router {
  constructor(options) {
    this._routes = options.routes;

    this.routeHistory = [];
    this.currentIndex = -1;
    this.currentUrl = "";

    this.changeFlag = true;

    this._init();
  }

  static getPath() {
    let hash = window.location.hash;
    if (!hash) {
      return "";
    }
    hash = hash.slice(1);
    const searchIdx = hash.indexOf("?");
    return searchIdx >= 0 ? hash.slice(0, searchIdx) : hash;
  }

  static changeHash(path, query) {
    if (query) {
      let queryStr = "";
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          queryStr += `&${key}=${query[key]}`;
        }
      }
      window.location.hash = `${path}?${queryStr.slice(1)}`;
    } else {
      window.location.hash = path;
    }
  }

  _init() {
    window.addEventListener("load", this.refresh.bind(this), false);
    window.addEventListener("hashchange", this.refresh.bind(this), false);
  }

  refresh() {
    if (this.changeFlag) {
      this.currentUrl = window.location.hash.slice(1) || "/";
      this.routeHistory.push(this.currentUrl);
      this.currentIndex++;
    } else {
      this.changeFlag = true;
    }

    const path = Router.getPath();
    let currentComponentName = "";
    let nodeList = document.querySelectorAll("[data-component-name");

    for (let i = 0; i < this._routes.length; i++) {
      if (this._routes[i].path === path) {
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
      Router.changeHash(options.path, options.query);
    } else if (options.name) {
      let path = "";
      for (let i = 0; i < this._routes.length; i++) {
        if (this._routes[i].name === options.name) {
          path = this._routes[i].path;
          break;
        }
      }
      if (path) Router.changeHash(path, options.query);
    }
  }

  back() {
    this.changeFlag = false;

    this.currentIndex--;
    this.currentUrl = this.routeHistory[this.currentIndex];
    if (this.currentUrl) Router.changeHash(this.currentUrl);
  }

  forward() {
    this.changeFlag = false;

    this.currentIndex++;
    this.currentUrl = this.routeHistory[this.currentIndex];
    if (this.currentUrl) Router.changeHash(this.currentUrl);
  }
}
