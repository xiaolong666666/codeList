var find = function(data) {
  return {
    where: function(condition) {
      var filteredData = data.filter((item) => condition.title.test(item.title));
      return {
        orderBy: function(key, order) {
          filteredData.sort((a, b) => order === 'desc' ? b[key] - a[key] : a[key] - b[key]);
          return filteredData;
        }
      }
    }
  }
}

var result = find(data).where({ "title": /\d$/ }).orderBy("useId", 'desc');
