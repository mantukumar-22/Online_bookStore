class SearchFilter {

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search by book title or author
    search() {

        const keyword = this.queryStr.keyword
            ? {
                  $or: [
                      {
                          title: {
                              $regex: this.queryStr.keyword,
                              $options: "i",
                          },
                      },
                      {
                          author: {
                              $regex: this.queryStr.keyword,
                              $options: "i",
                          },
                      },
                  ],
              }
            : {};

        this.query = this.query.find(keyword);

        return this;
    }

    // Filter books
    filter() {

        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Price Filter
        if (queryCopy.price) {
            queryCopy.price = {};

            if (this.queryStr.price.gte)
                queryCopy.price.$gte = Number(this.queryStr.price.gte);

            if (this.queryStr.price.lte)
                queryCopy.price.$lte = Number(this.queryStr.price.lte);
        }

        this.query = this.query.find(queryCopy);

        return this;
    }

    // Pagination
    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = SearchFilter;