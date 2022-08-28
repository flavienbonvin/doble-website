interface Props {
  color?: string
}

const Divider = ({ color }: Props) => {
  return (
    <div
      className={`my-5 flex-grow border-2 border-t ${
        color ? color : "border-gray-100"
      }`}
    />
  )
}

export default Divider
