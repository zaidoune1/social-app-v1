export const handelError = (prams: any): string[] | any => {
  let result: string[] = [];
  let obj: any;

  for (obj in prams) {
    if (prams[obj] === "") {
      result.push(obj);
    }
  }
  return result;
};
