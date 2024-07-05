export const executeQuery = async (url, query, variables) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query,
        variables
      })
    });

    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      return;
    }

    const responseText = await response.text();

    const result = JSON.parse(responseText);

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
    }

    return result.data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
