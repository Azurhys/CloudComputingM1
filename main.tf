

resource "azurerm_sql_database" "my_db" {
  name = "my_db"
  tier = "Standard"
  size = "Basic"
}

