function Button ({ text, onClick }) {

  const styles = {
    'backgroundColor' : 'grey',
    'border' : 'solid 2px purple',
    'borderRadius' : '10px',
    'padding' : '10px 12px',
    'width' : 'fit-content',
    'color' : 'white'
}
  return (
    <button className="Button" style={styles} onClick={onClick}> {text}
    </button>
  );

}

export default Button;