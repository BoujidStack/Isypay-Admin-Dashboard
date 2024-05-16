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
        // Constructing the message
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
        <CCardHeader>IsyPay Customer Deposit and Withdrawal</CCardHeader>
        <CCol sm={10} style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>
          <CForm className="row g-3 d-flex align-items-center" onSubmit={handleSubmit}>
            <CCol xs="auto" className="d-flex flex-row align-items-center">
              <CFormLabel htmlFor="operationCode" className="me-2" style={{ whiteSpace: 'nowrap' }}>
                Operation code :
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
