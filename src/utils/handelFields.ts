export const handelError = (requiredFields: any): string[] | [] => {
  let result: string[] = [];
  let field: string;

  for (field in requiredFields) {
    if (!requiredFields[field] || requiredFields[field] === "") {
      result.push(field);
    }
  }
  return result;
};
