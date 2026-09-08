class APIHelper {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  // http://localhost:8000/api/v1/products?category=Books&keyword=google&page=1&limit=5
  filter() {
    const queryCopy = { ...this.queryString };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => delete queryCopy[field]);
    this.query = this.query.find(queryCopy);
    return this;
  }
  pagenation() {}
}
