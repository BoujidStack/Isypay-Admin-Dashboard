import React, { useState } from 'react';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CButton,
  CCardHeader,
  CCard,
  CSpinner,
} from '@coreui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function DepositWithdrawals() {
  const [operationCode, setOperationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setOperationCode(e.target.value);
  };

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^223(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
      return '+223 ' + match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return phoneNumberString;
  }

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
        // Calculate total amount
        const totalAmount = data.amount + data.totalFee;
        const fullNames = data.user.firstName + ' ' + data.user.lastName;

        // Constructing the message
        const message = `
<div style="text-align: center; font-family: Arial, sans-serif;">
  <div style="display: inline-block; text-align: left; border: 1px solid #ccc; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
    <p style="margin: 5px 0;">Commerce's name: <span style="font-weight: bold;">${data.user.displayName}</span></p>
    <p style="margin: 5px 0;">Full names: <span style="font-weight: bold;">${fullNames}</span></p>
    <p style="margin: 5px 0;">Phone number: <span style="font-weight: bold;">${formatPhoneNumber(data.user.phoneNumber)}</span></p>
    <p style="margin: 5px 0;">Type: <span style="font-weight: bold;">${data.dwType.toUpperCase()}</span></p>
    <p style="margin: 5px 0;">Amount: <span style="font-weight: bold;">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(data.amount)}</span></p>
    <p style="margin: 5px 0;">Fees: <span style="font-weight: bold;">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(data.totalFee)}</span></p>
    <p style="margin: 5px 0;">Total To Pay: <span style="font-weight: bold;">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(totalAmount)}</span></p>
    <br>
    <p>Are you agree to continue?</p>
  </div>
</div>
`;

        // Show confirmation dialog
        const result = await MySwal.fire({
          title: `Transaction Confirmation`,
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
            showCancelButton: true,
            preConfirm: () => {
              // Set loading state to true to show the spinner
              setLoading(true);
            }
          });

          // If a pin code is entered, make the PUT request to accept the operation
          if (pin) {
            try {
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
                  // Clear the operation code after successful acceptance
                  setOperationCode('');
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
            } finally {
              setLoading(false); // Stop loading
            }
          } else {
            setLoading(false); // Stop loading if pin entry is cancelled
          }
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
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>IsyPay Customer Deposit and Withdrawal</CCardHeader>
        <CCol sm={10} style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>
          <CForm className="row g-3 d-flex align-items-center" onSubmit={handleSubmit}>
            <CCol xs="auto" className="d-flex flex-row align-items-center">
              <CFormLabel htmlFor="operationCode" className="me-2" style={{ whiteSpace: 'nowrap' }}>
                Operation code :
              </CFormLabel>
              <CFormInput type="text" id="operationCode" placeholder="Enter Operation Code" value={operationCode} onChange={handleInputChange} className="me-2" />
              <CButton color="info" type="submit" className="ms-2" disabled={loading}>
                Search
              </CButton>
            </CCol>
          </CForm>
        </CCol>
      </CCard>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999
        }}>
          <CSpinner style={{ width: '4rem', height: '4rem' }} />
        </div>
      )}
    </>
  );
}

export default DepositWithdrawals;
