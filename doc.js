export const swaggerDocument =
{
  "swagger": "2.0",
  "info": {
    "description": "Simple Bank API",
    "version": "1.0.0",
    "title": "Simple Bank API"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "account",
      "description": "Account management"
    }
  ],
  "paths": {
    "/account": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get existing accounts",
        "description": "Get existing account description",
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error occurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Create a new account",
        "description": "Create a new account with the received parameters",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account created"
          },
          "400": {
            "description": "Error occurred"
          }
        }
      }
    },
    "/account/{accountId}": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get an specific account",
        "description": "Get information of an specific account",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "ID of account to return",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error occurred"
          }
        }
      },
      "put": {
        "tags": [
          "account"
        ],
        "summary": "Update an existing account",
        "description": "Update all information from an existing account",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "ID of account to update",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account updated"
          },
          "400": {
            "description": "Error occurred"
          }
        }
      },
      "delete": {
        "tags": [
          "account"
        ],
        "summary": "Delete an existing account",
        "description": "Delete all information from an existing account",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "ID of account to delete",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "204": {
            "description": "Deleted"
          },
          "400": {
            "description": "Error occurred"
          }
        }
      }
    },
    "/account/{accountId}/update-balance": {
      "patch": {
        "tags": [
          "account"
        ],
        "summary": "Update an existing account",
        "description": "Update balance information from an existing account",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "ID of account to patch",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Balance object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Balance"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account updated"
          },
          "400": {
            "description": "Error occurred"
          }
        }
      }
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Jonathan Pauluze"
        },
        "balance": {
          "type": "number",
          "example": 742.34
        }
      }
    },
    "Balance": {
      "type": "object",
      "properties": {
        "balance": {
          "type": "number",
          "example": 3500
        }
      }
    }
  }
};