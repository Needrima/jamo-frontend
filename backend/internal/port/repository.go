package ports

import "Dona/backend/internal/core/domain/entity"

type Repository interface {
	CreateNotification(notification entity.Notification) (interface{}, error)
	GetNotificationStatus(ref string) (interface{}, error)
	GetNotificationByRef(CountryCode string) (interface{}, error)
	GetNotificationList(page string) (interface{}, error)
	UpdateNotification(notification entity.Notification) (interface{}, error)
}