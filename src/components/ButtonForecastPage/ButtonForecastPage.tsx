import React from 'react'

type Props = {
  onClick: () => void
  buttonText: string
  className: string
  children: React.ReactNode
}

const ButtonForecastPage = ({
  onClick,
  buttonText,
  className,
  children,
}: Props) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
      <span className="pl-2">{buttonText}</span>
    </button>
  )
}

export default ButtonForecastPage
