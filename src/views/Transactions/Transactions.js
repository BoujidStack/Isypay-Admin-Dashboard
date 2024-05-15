import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  CCard,
  CCardHeader,
  CSpinner,
} from '@coreui/react';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  };

  return date.toLocaleString('en-US', options).replace(',', '');
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(formatDate(new Date()));
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  const fetchTransactions = async () => {
    setLoading(true); // Set loading to true when data fetching starts
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://api.staging.k8s.isypay.net/api/user-transfers?page=0&size=20&sort=createdDate%2Cdesc', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data);
      console.log('Data fetched successfully:', data);
    } catch (error) {
      console.error('Fetching data error:', error);
    } finally {
      setLoading(false); // Set loading to false after data fetching completes
    }
  };

  useEffect(() => {
    fetchTransactions();

    const intervalId = setInterval(() => {
      setCurrentDateTime(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const refreshData = () => {
    console.log('Refreshing data...');
    fetchTransactions();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'First Name',
            accessor: 'user.firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'user.lastName',
          },
          {
            Header: 'Phone Number',
            accessor: 'user.phoneNumber',
          },
        ],
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Fee',
        accessor: 'fee',
      },
      {
        Header: 'Transfer Type',
        accessor: 'transferType',
        Cell: ({ value }) => (
          <span className={`status ${getStatusColor(value)}`}>
            {value} {getIcon(value)}
          </span>
        ),
      },
      {
        Header: 'Created Date',
        accessor: 'createdDate',
        Cell: ({ value }) => formatDate(new Date(value)),
      },

    ],
    []
  );

  const icons = {
    'WITHDRAW': faArrowRight,
    'ACCEPT_WITHDRAW': faArrowUp,
    'ACCEPT_DEPOSIT': faArrowDown
  };

  const getIcon = (status) => {
    const icon = icons[status];
    return icon && <FontAwesomeIcon icon={icon} className="ml-1" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'WITHDRAW':
        return 'text-danger';
      case 'ACCEPT_WITHDRAW':
        return 'text-success';
      case 'ACCEPT_DEPOSIT':
        return 'text-primary';
      default:
        return '';
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    setPageSize,
  } = useTable(
    {
      columns,
      data: transactions,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5>Transactions</h5>
          <button onClick={refreshData} className="btn btn-info">
          <FontAwesomeIcon icon={faRefresh} />
          </button>
        </CCardHeader>
        {loading ? ( // Display loading spinner if loading is true
          <div className="text-center mt-5">
            <CSpinner color="primary" />
          </div>
        ) : (
          <div className="table-responsive" style={{ marginTop: '10px'}}>
            <input
              value={globalFilter || ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search transactions..."
              className="form-control mb-2"
            />
            <table {...getTableProps()} className="table table-bordered table-striped">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()} className="align-middle">{cell.render('Cell')}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-info mr-2" style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-info" style={{ marginLeft: '15px' }}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div style={{ marginRight: '10px', marginBottom: '10px' }}>
            <span className="mr-2">Page {pageIndex + 1} of {pageOptions.length}</span>
            <select
              value={pageSize}
              onChange={e => {
                console.log('Selected page size:', e.target.value);
                setPageSize(Number(e.target.value));
              }}
              className="form-control"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CCard>
    </>
  );
};

export default Transactions;
