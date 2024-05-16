import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://isypay.net/" target="_blank" rel="noopener noreferrer">
          IsyPay
        </a>
        <span className="ms-1">&copy; 2024 IsyPay Bank Dashboard</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://isypay.net/" target="_blank" rel="noopener noreferrer">
        IsyPay Team
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
