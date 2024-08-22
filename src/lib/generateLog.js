export const generateLog = (action, options) => {
  let diffValues = [];

  if (action === "updateRow") {
    const { data, dirtyFields, formValues } = options;
    const updatedFields = Object.keys(dirtyFields);
    diffValues = updatedFields.map((field) => ({
      field,
      previous: formValues[field],
      current: data[field],
    }));
  }

  if (action === "updateStatus") {
    const { newStatus, previousStatus } = options;

    diffValues = [
      {
        field: "status",
        previous: previousStatus,
        current: newStatus,
      },
    ];
  }

  if (action === "archiveRow") {
    diffValues = [
      {
        field: "stage",
        previous: "active",
        current: "archived",
      },
    ];
  }

  // if (action === "archiveMultipleRows") {
  //   const { selectedRows } = options;
  //   const { data } = options;
  //   console.log(selectedRows);
  //   console.log(data);
  //   const dataSelectedRows = data.map((row) => ({
  //     ...row,
  //     stage: "archived",
  //   }));
  //   diffValues = [
  //     {
  //       field: "stage",
  //       previous: "active",
  //       current: "archived",
  //     },
  //   ];
  // }
  console.log(diffValues);
  return [diffValues];
};
