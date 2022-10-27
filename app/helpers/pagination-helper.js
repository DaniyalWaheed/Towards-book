class PaginationHelper {
  static getPaginationInformation(chunkSize, pageNo, totalRows) {
    let startRecord = chunkSize * pageNo - chunkSize + 1;
    let endRecord = chunkSize * pageNo;
    endRecord = endRecord > totalRows ? totalRows : endRecord;
    let totalPages = Math.ceil(totalRows / chunkSize);

    return {
      //pagination_message: pageNo > totalPages ? `No record` : `showing ${startRecord} to ${endRecord} of ${totalRows} records`,
      page_no: pageNo,
      total_Pages: totalPages,
      start_record: startRecord,
      end_record: endRecord,
      total_rows: totalRows,
    };
  }

  static getPaginatedListing(
    dbResponses,
    dataKey,
    chunkSize,
    pageNo,
    mapData = true
  ) {
    const total_rows = dbResponses[0][0][0].total_rows;
    const data = mapData
      ? dbResponses[1][0].map((data) => JSON.parse(data[dataKey]))
      : dbResponses[1][0];
    return this.getPaginated(total_rows, data, dataKey, chunkSize, pageNo);
  }

  static getPaginated(total_rows, data, dataKey, chunkSize, pageNo) {
    const pagination_info = PaginationHelper.getPaginationInformation(
      chunkSize,
      pageNo,
      total_rows
    );

    return {
      listing: {
        [dataKey]: data,
        pagination_info,
        total_rows,
      },
    };
  }
}

module.exports = PaginationHelper;
