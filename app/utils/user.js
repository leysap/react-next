'use server'

// funciones realizadas para crear usuario, validar usuario y para el login del usuario
async function createUser(data) {
    console.log(data)
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/register`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const dataRes = await response.json();
        return (dataRes);
    } catch (error) {
      console.error('Failed to register user:', error)
      throw new Error('Failed to register user.')
    }
}

async function validateUser(token, data) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/validation`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const dataRes = await response.json();
        return (dataRes);
    } catch (error) {
          console.error('Failed to match code:', error)
        throw new Error('Failed to match code.')
    }
}

async function loginUser(data) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const dataRes = await response.json();
        return (dataRes);
    } catch (error) {
          console.error('Failed to login user:', error)
        throw new Error('Failed to login user.')
    }
}

//CLIENTES: creamos un nuevo cliente con POST autenticando el token
async function newClient(token, data) {
  console.log("la info en user.js: ", data);
  console.log("token en user.js: ", token);
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/client`;
    console.log("URL: ", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", errorData);
      throw new Error("La respuesta de red no fue correcta: " + response.statusText);
    }
    const dataRes = await response.json();
    console.log(dataRes);
    return dataRes;
  } catch (error) {
      console.error("Failed to create new client:", error);
    throw new Error("Failed to create new client.");
  }
}

//CLIENTES: LISTAMOS LOS CLIENTES CREADOS
async function listClient(token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/client`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
      console.error("Failed to show data client:", error);
    throw new Error("Failed to show data client.");
  }
}

// Obtenemos un cliente por su id 
async function clientInfo(id, token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/client/${id}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
      console.error("Failed to show data client:", error);
    throw new Error("Failed to show data client.");
  }
}





//PROYECTOS
async function newProject(id, token, data) {

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/project`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
      console.error("Failed to create new project:", error);
    throw new Error("Failed to create new project.");
  }
}


async function listProject(token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/project`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
      console.error("Failed to show data project:", error);
    throw new Error("Failed to show data project.");
  }
}


async function getProjectById(id, token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/project/one/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const projectData = await response.json();
    console.log("Datos del proyecto en prjectID:", projectData);
    return projectData;
  } catch (error) {
      console.error("Failed to fetch project:", error);
    throw new Error("Failed to fetch project.");
  }
}

const updateProject = async (id, data, token) => {
  try{
      const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/project/${id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('No se pudo actualizar el proyecto.');
    }
    const dataRes = await response.json();
    return dataRes;
  }catch(error){
      console.error("Failed to show data client:", error);
    throw new Error("Failed to show data client.");
  }
};


async function newDeliverynote(token, data) {

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/deliverynote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        "La respuesta de la red no fue correcta: " + response.statusText
      );
    }
    const dataRes = await response.json();
    console.log("full data albaranes: ", dataRes);
    return dataRes;
  } catch (error) {
      console.error("Failed to create new deliverynote:", error);
    throw new Error("Failed to create new deliverynote.");
  }
}

async function getDeliverynote(token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/deliverynote`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
      console.error("Failed to show data client:", error);
    throw new Error("Failed to show data client.");
  }
}

async function deliveryNoteById(id, token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/deliverynote/${id}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
    console.error("Failed to show data client:", error);
    throw new Error("Failed to show data client.");
  }
}
export { createUser, validateUser, loginUser , listClient, newClient, clientInfo, newProject, listProject, getProjectById , newDeliverynote, getDeliverynote, deliveryNoteById, updateProject}

