type PaginationProps = {
  numberOfPages: number;
  currentPage: number;
};

const Pagination = ({ numberOfPages, currentPage }: PaginationProps) => {
  const pageItems = [];
  for (let index = 1; index <= numberOfPages; index++) {
    pageItems.push(
      <button
        key={index}
        className={
          index === currentPage ? "join-item btn" : "join-item btn btn-active"
        }
      >
        {index}
      </button>
    );
  }

  return <div className="join">{pageItems}</div>;
};

export default Pagination;
