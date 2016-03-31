module.exports = expr => {
  
  return {
    expr,
    result: eval(expr)
  }
};