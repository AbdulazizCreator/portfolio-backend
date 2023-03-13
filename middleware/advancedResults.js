const advancedResults =
  (model, populate, withAuth) => async (req, res, next) => {
    let query;

    let reqQuery = { ...req.query };

    let removeFields = ["select", "sort", "page", "limit"];

    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(lte|lt|gte|gt|in)\b/g,
      (match) => `$${match}`
    );

    // All the datas
    console.log(JSON.parse(queryStr));
    if (withAuth) {
      query = model.find({ user: req.user.id, ...JSON.parse(queryStr) });
    } else {
      query = model.find(JSON.parse(queryStr));
    }
    const nat = await model.find({ answer: { $gt: "" } });
    console.log(nat);

    // Select Fields
    if (req.query.select) {
      console.log("Select");
      let fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      let sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    const results = await query;

    let pagination = {};

    if (endIndex < total) {
      pagination.next = page + 1;
    }

    if (startIndex > 0) {
      pagination.prev = page - 1;
    }
    pagination.total = total;
    pagination.limit = limit;
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };
    next();
  };

module.exports = advancedResults;
