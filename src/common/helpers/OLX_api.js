import Cookies from "js-cookie";
import QueryString from "qs";

const BASEAPI = "http://localhost:5000/";

const apiPost = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};
const apiPostFile = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) {
      body.append("token", token);
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    body,
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};

export const apiGet = async (endpoint, body = []) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(
    `${BASEAPI + endpoint}?${QueryString.stringify(body)}`
  );

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};

const OlxApi = {
  login: async (email, password) => {
    const json = await apiPost("user/signin", {
      email,
      password,
    });

    return json;
  },
  signup: async (name, email, state, password) => {
    const json = await apiPost("user/signup", {
      name,
      email,
      state,
      password,
    });

    return json;
  },
  getStates: async () => {
    const json = await apiGet("states");

    return json.states;
  },
  getCategories: async () => {
    const json = await apiGet("categories");

    return json.categories;
  },
  getAds: async options => {
    const json = await apiGet("ad/list", options);

    return json;
  },
  getAd: async (id, other = false) => {
    const json = await apiGet("ad/item", { id, other });

    return json;
  },
  addAd: async fData => {
    const json = await apiPostFile("ad/add", fData);
    return json;
  },
};

export default () => OlxApi;
