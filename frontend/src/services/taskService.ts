const apiUrl = process.env.REACT_APP_API_URL

export type Task = {
  id: string;
  description: string;
  done: boolean;
};

const tasks = [
  { id: 'c04bfccf-b4a6-40ca-883c-49ee2a0c917a', description: 'Task A', done: true },
  { id: '37df92e6-befb-4a94-a3c9-fe8f32410e5b', description: 'Task B', done: false }
];

export const getTasks = async (): Promise<Array<Task>> => {
  const result = await fetch(`${apiUrl}/tasks`, {
    method: "GET",
    headers: {
      'Accept': "application/json"
    }
  })

  if (result.ok) {
    return result.json()
  }

  throw Error(`Could not get tasks - ${result.statusText}`)
};

export const setStatus = async (id: string, done: boolean): Promise<Task> => {
  const result = await fetch(`${apiUrl}/tasks/${id}`, {
    method: "PUT",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify({ done })
  })

  if (result.ok) {
    return result.json()
  }

  throw Error(`Could not update task ${id} - ${result.statusText}`)
};

export const addTask = async (description: string): Promise<Task> => {
  const result = await fetch(`${apiUrl}/tasks`, {
    method: "POST",
    headers: { 
      'Accept': "application/json",
      'Content-Type': "application/json"
     },
    body: JSON.stringify({ description })
  })

  if (result.ok) {
    return result.json()
  }

  throw Error(`Could not create task - ${result.statusText}`)
}
