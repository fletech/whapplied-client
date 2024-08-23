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
    console.log(options);
    const { stage } = options;
    console.log(stage);
    //stage es un numero 2 para achivado 1 para activo
    diffValues = [
      {
        field: "stage",
        previous: stage === "2" ? "archived" : "active",
        current: stage === "2" ? "active" : "archived",
      },
    ];
  }

  if (action === "archiveManyRows") {
    console.log(options);
    const { isAllActive, isAllArchived, isMixed } = options;

    // const isAllActive = dataFiltered.every((item) => item.stage === "1");
    // const isAllArchived = dataFiltered.every((item) => item.stage === "2");
    // const isMixed = dataFiltered.some(
    //   (item) => item.stage === "1" || item.stage === "2"
    // );

    if (isAllActive || isMixed) {
      diffValues = [
        {
          field: "stage",
          previous: "active",
          current: "archived",
        },
      ];
    }

    if (isAllArchived) {
      diffValues = [
        {
          field: "stage",
          previous: "archived",
          current: "active",
        },
      ];
    }
  }

  return [diffValues];
};
