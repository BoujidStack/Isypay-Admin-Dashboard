import React, { useState } from 'react';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CButton,
  CCardHeader,
  CCard
} from '@coreui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { cilPeople } from '@coreui/icons';

const MySwal = withReactContent(Swal);

function DepositWithdrawals() {
  const [operationCode, setOperationCode] = useState('');

  const handleInputChange = (e) => {
    setOperationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      // Fetch the fees for the operation
      const response = await fetch(`https://api.staging.k8s.isypay.net/api/bank-deposit-withdrawals/fees/${operationCode}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Constructing the message
        // Calculate total amount
        const totalAmount = data.amount + data.totalFee;

        // Constructing the message
        const message = `
<div style="text-align: center;">
  <div style="display: inline-block; text-align: left;">
    Hello Supermarket's ${data.user.displayName}<br>
    phoneNumber: ${data.user.phoneNumber},<br>
    Type: ${data.dwType.toUpperCase()},<br>
    amount: ${data.amount},<br>
    Fees: ${data.totalFee},<br>
    Total amount: ${totalAmount}<br><br>

    Are you agree to continue?
  </div>
</div>
`;

        // Show confirmation dialog
        const result = await MySwal.fire({
          title: `Confirmation Transaction :`,
          html: message,
          showCancelButton: true,
          confirmButtonText: 'Accept',
          cancelButtonText: 'Cancel'
        });


        // If the user confirms, prompt for the pin code
        if (result.isConfirmed) {
          const { value: pin } = await MySwal.fire({
            title: 'Enter your pin code',
            input: 'password',
            inputPlaceholder: 'Enter your pin code',
            inputAttributes: {
              'maxlength': 4,
              'autocapitalize': 'off',
              'autocorrect': 'off'
            },
            showCancelButton: true
          });


          // If a pin code is entered, make the PUT request to accept the operation
          if (pin) {
            const acceptResponse = await fetch(`https://api.staging.k8s.isypay.net/api/bank-deposit-withdrawals/accept/${operationCode}?txPin=${pin}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (acceptResponse.ok) {
              // Handle successful acceptance
              MySwal.fire({
                icon: 'success',
                title: 'Accepted!',
                text: 'The operation has been successfully accepted.',
              }).then(() => {
                // Set the operation code after successful acceptance
                setOperationCode(operationCode);
              });
            } else {
              // Handle errors in acceptance
              const acceptErrorData = await acceptResponse.json();
              MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error: ${acceptErrorData.errorKey}`,
              });
            }
          }
        } else {
          // Handle the cancellation action
          console.log('Operation cancelled by the user.');
        }
      } else {
        // Handle errors in fetching fees
        const errorData = await response.json();
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${errorData.errorKey}`,
        });
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error occurred.',
      });
    } finally {
      // Reset the operation code
      setOperationCode('');
    }
  };


  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Deposit/Withdrawals</CCardHeader>
        <CCol sm={10} style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>
          <CForm className="row g-3 d-flex align-items-center" onSubmit={handleSubmit}>
            <CCol xs="auto" className="d-flex flex-row align-items-center">
              <CFormLabel htmlFor="operationCode" className="me-2" style={{ whiteSpace: 'nowrap' }}>
                Operation Code :
              </CFormLabel>
              <CFormInput type="text" id="operationCode" placeholder="Enter Operation Code" value={operationCode} onChange={handleInputChange} className="me-2" />
              <CButton color="info" type="submit" className="ms-2">
                Search
              </CButton>
            </CCol>
          </CForm>

        </CCol>
      </CCard>
    </>
  );
}

export default DepositWithdrawals;
