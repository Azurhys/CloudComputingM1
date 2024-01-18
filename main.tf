terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  skip_provider_registration = true
  features {}
}

# Création d'un groupe de ressources
resource "azurerm_resource_group" "hof_app_rg" {
  name     = "hof-app-rg-romain-antoine"
  location = "West Europe"
}

resource "azurerm_virtual_network" "hof_virtual_network" {
  name                = "hof-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.hof_app_rg.location
  resource_group_name = azurerm_resource_group.hof_app_rg.name
}

resource "azurerm_subnet" "hof_subnet" {
  name                 = "hof-subnet-internal"
  resource_group_name  = azurerm_resource_group.hof_app_rg.name
  virtual_network_name = azurerm_virtual_network.hof_virtual_network.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_public_ip" "hof_public_ip" {
  name                = "hof-public-ip"
  resource_group_name = azurerm_resource_group.hof_app_rg.name
  location            = azurerm_resource_group.hof_app_rg.location
  allocation_method  = "Dynamic"
}

resource "azurerm_network_security_group" "hof_net_secu_group" {
  name                = "hof_secu_group"
  location            = azurerm_resource_group.hof_app_rg.location
  resource_group_name = azurerm_resource_group.hof_app_rg.name
}

resource "azurerm_network_security_rule" "port_rule_ssh" {
  name                        = "ssh"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefixes = ["0.0.0.0/0"]
  destination_address_prefixes = ["0.0.0.0/0"]
  resource_group_name         = azurerm_resource_group.hof_app_rg.name
  network_security_group_name = azurerm_network_security_group.hof_net_secu_group.name
}

resource "azurerm_network_security_rule" "port_rule_mysql" {
  name                        = "mysql"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "5173"
  source_address_prefixes = ["0.0.0.0/0"]
  destination_address_prefixes = ["0.0.0.0/0"]
  resource_group_name         = azurerm_resource_group.hof_app_rg.name
  network_security_group_name = azurerm_network_security_group.hof_net_secu_group.name
}

resource "azurerm_network_security_rule" "port_rule_web" {
  name                        = "web"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "5001"
  source_address_prefixes = ["0.0.0.0/0"]
  destination_address_prefixes = ["0.0.0.0/0"]
  resource_group_name         = azurerm_resource_group.hof_app_rg.name
  network_security_group_name = azurerm_network_security_group.hof_net_secu_group.name
}

resource "azurerm_network_interface" "hof_network_interface" {
  name                = "hof-nic"
  location            = azurerm_resource_group.hof_app_rg.location
  resource_group_name = azurerm_resource_group.hof_app_rg.name

  ip_configuration {
    name                          = "hof-ip"
    subnet_id                     = azurerm_subnet.hof_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.hof_public_ip.id
  }
}

# Création d'une machine virtuelle Linux
resource "azurerm_linux_virtual_machine" "react_app_vm" {
  name                  = "hof-app-vm"
  resource_group_name   = azurerm_resource_group.hof_app_rg.name
  location              = azurerm_resource_group.hof_app_rg.location
  size                  = "Standard_F2"
  admin_username        = "adminuser-hof"
  network_interface_ids = [azurerm_network_interface.hof_network_interface.id,]

  admin_ssh_key {
    username   = "adminuser-hof"
    public_key = file("~/.ssh/id_rsa_hof.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}

resource "azurerm_storage_account" "hof_storage_account" {
  name                     = "hofsa"
  resource_group_name      = azurerm_resource_group.hof_app_rg.name
  location                 = azurerm_resource_group.hof_app_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_mysql_server" "hof_mysql_server" {
  name                = "hof-sqlserver"
  location            = azurerm_resource_group.hof_app_rg.location
  resource_group_name = azurerm_resource_group.hof_app_rg.name

  administrator_login          = "hof-user-admin"
  administrator_login_password = "mBtfUJ2?b@djS&z0"

  sku_name   = "GP_Gen5_2"
  storage_mb = 5120
  version    = "5.7"

  auto_grow_enabled                 = true
  backup_retention_days             = 7
  geo_redundant_backup_enabled      = true
  infrastructure_encryption_enabled = true
  public_network_access_enabled     = false
  ssl_enforcement_enabled           = true
  ssl_minimal_tls_version_enforced  = "TLS1_2"
}

resource "azurerm_mysql_database" "hof_mysql_database" {
  name                = "hof-db"
  resource_group_name = azurerm_resource_group.hof_app_rg.name
  server_name         = azurerm_mysql_server.hof_mysql_server.name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"


  # prevent the possibility of accidental data loss
  lifecycle {
    prevent_destroy = true
  }
}


