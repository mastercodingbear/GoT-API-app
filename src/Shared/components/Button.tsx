import React from 'react'

interface Props {
  className?: string
  disabled?: boolean
  text: string
  onClick: () => void
}

const Button: React.FC<Props> = (props: Props) => {
  return (
    <button
      className={`${
        props.className ?? ''
      } bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white disabled:bg-slate-600`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default Button
