
/**
 * API routes mapping consuming the provided backend API.
 */
const api = {
  $children: {

    api: {
      //region app paths
      $prefix: 'api',
      $children: {

     
        //region Auth
        auth: {
          $prefix: "auth",

          login: {
            $url: "login",
            $method: "POST"
          },
          logout: {
            $url: "logout",
            $method: "GET"
          },
          user: {
            $url: "user",
            $method: "GET"
          }
          //endregion Auth
        },

        //region logout
        logout: {
          // $prefix: "auth",
          $url: "logout",
          $method: "GET"
          // logout: {
          //   $url: "logout",
          //   $method: "GET"
          // },
        },

        //region menu_items
        menu_items: {
          $prefix: "menu-items",

          fetchAll: {
            $url: "",
            $method: "GET"
          },
          // create: {
          //   $url: "",
          //   $method: "POST"
          // },
          // update: {
          //   $url: "",
          //   $method: "PUT",
          //   $requires: ["id"],
          //   $format: Template(() => `${id}`)
          // },
          // delete: {
          //   $url: "",
          //   $method: "DELETE",
          //   $requires: ["id"],
          //   $format: Template(() => `${id}`)
          // },
        },
        //endregion menu_items

        //region menu_items
        coupons: {
          $prefix: "coupons",

          fetchAll: {
            $url: "",
            $method: "GET"
          },
          // create: {
          //   $url: "",
          //   $method: "POST"
          // },
          // update: {
          //   $url: "",
          //   $method: "PUT",
          //   $requires: ["id"],
          //   $format: Template(() => `${id}`)
          // },
          // delete: {
          //   $url: "",
          //   $method: "DELETE",
          //   $requires: ["id"],
          //   $format: Template(() => `${id}`)
          // },
        },
        //endregion menu_items

        //region menu_items
        orders: {
          $prefix: "orders",

          // fetchAll: {
          //   $url: "",
          //   $method: "GET"
          // },
          bulk: {
            $url: "bulk",
            $method: "POST"
          },
          user: {
            $url: "user",
            $method: "PUT",
            $requires: ["id"],
            $format: Template(() => `user/${id}`)
          },
          // delete: {
          //   $url: "",
          //   $method: "DELETE",
          //   $requires: ["id"],
          //   $format: Template(() => `${id}`)
          // },
        },
        //endregion menu_items
      }
    }
    //endregion API paths
  }
};

/**
 *Formats the passed callback to its full url path.
 *
 * @param {function} cb
 * return function
 */
function Template(cb) {
  return function (data) {
    const dataKeys = [];
    const dataVals = [];
    for (let key in data) {
      dataKeys.push(key);
      dataVals.push(data[key]);
    }
    let func = new Function(...dataKeys, "return (" + cb + ")();");
    return func(...dataVals);
  };
}

/**
 * Export const api for api-helper consumption.
 */
export {
  api
};
