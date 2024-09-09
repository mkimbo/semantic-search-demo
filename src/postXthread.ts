import axios from "axios";

interface ApiResponse {
  postId: string;
  // Add any other fields as necessary
}

export default async function postXThread(
  thread: string
): Promise<string | null> {
  try {
    const res = await postSequentially(thread);
    return res.postId;
  } catch (error: Error | any) {
    console.error(`Error fetching the URL: ${error.message}`);
    return null;
  }
}

async function postToX(
  text: string,
  previousPostId?: string
): Promise<ApiResponse> {
  const payload = {
    text,
    post_id: previousPostId, // If there is a previous post ID, use it to create a thread
  };

  const response = await axios.post(
    process.env.X_THREADS_HOOK as string,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status != 200) {
    throw new Error("Failed to post to social media");
  }

  const data: ApiResponse = response.data;
  return data;
}

// Function to split the text and post each part sequentially
async function postSequentially(text: string): Promise<ApiResponse> {
  const parts = text.split("|||").map((part) => part.trim());
  let previousPostId: string = "n/a";

  for (const [index, part] of parts.entries()) {
    const num = `${index + 1}/${parts.length}`;
    try {
      const response = await postToX(
        `${index == 0 ? "" : num}${index == 0 ? "" : "\\n"}${part}${
          index == 0 ? "\n A thread 🧵" : ""
        }${index == 0 ? num : ""}`,
        previousPostId
      );
      previousPostId = response.postId;
      console.log(`Posted: ${part} with Post ID: ${response.postId}`);
    } catch (error) {
      console.error("Error posting to social media:", error);
      break; // Stop the loop if there is an error
    }
  }
  return { postId: previousPostId };
}
