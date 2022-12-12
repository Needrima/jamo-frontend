package ports

import "Dona/backend/internal/core/domain/entity"

type Service interface {
	CreateProduct(product entity.Product) (interface{}, error)
	GetProduct(amount int) (interface{}, error)
}
