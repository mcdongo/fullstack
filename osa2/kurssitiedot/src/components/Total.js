const Total = ({ parts }) => {
    let total = Sum(parts)
    return (
    <div>
        <b>total of {total} exercises</b>
    </div>
    )
}

function Sum(parts) {
    var totalAmount = parts.reduce(function(sum, part) {
        return sum + part.exercises
    }, 0)
    return totalAmount
}

export default Total
  