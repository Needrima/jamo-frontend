package api

import (
	"Dona/backend/internal/core/domain/entity"
	"Dona/backend/internal/core/helper"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (hdl *HTTPHandler) GetProduct(c *gin.Context) {
	amount, err := strconv.Atoi(c.Param("amount"))
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid amount in request URL",
		})
		return
	}

	products, err := hdl.Service.GetProduct(amount)

	if err != nil {
		c.AbortWithStatusJSON(404, err)
		return
	}

	c.JSON(200, products)
}

func (hdl *HTTPHandler) CreateProduct(c *gin.Context) {
	var product entity.Product

	if err := c.BindJSON(&product); err != nil {
		helper.LogEvent("ERROR", err.Error())
		c.JSON(400, gin.H{
			"error": "invald payload body",
		})

		return
	}

	productId, err := hdl.Service.CreateProduct(product)

	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{"id": productId})
}
