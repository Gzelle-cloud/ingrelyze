function MyRecipesComponent({ label, quantity, unit}) {

  return(
    <div>
      <p><b>{label}</b> - {quantity.toFixed()} {unit}</p>
    </div>
  )
}

export default MyRecipesComponent;