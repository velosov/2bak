export const helloWorld = (_: any,
  __: any,
  ctx : Context) => {

    const hw = `Hello World, ${ctx.vtex.account}!`
    const string = "This time from / Ahora desde / Agora do GraphQL "
    const string2 = "<-- Scroll all the way down left here"
    console.log(string)
  
  return [hw, string, string2]

  }