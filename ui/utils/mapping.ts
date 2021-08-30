import IOrder, { OrderStatus } from "../types/order"
import { calcCreditAmount, calcPrice } from "./calc";

export function getOrderStatus(order: IOrder) : {id: number, text: string, level: string } {

    const now = new Date().toISOString().slice(0, 16);
    const creditAmount = calcCreditAmount([order]);

    switch (order.status) {

        case 0:
            if (order.dateTimeFrom < now && order.dateTimeTo > now) {
                return {
                    id: OrderStatus.IN_PROGRESS,
                    text: 'Выполняется',
                    level: 'warning'
                }
            } else if (order.dateTimeFrom > now) {
                return {
                    id: OrderStatus.SCHEDULED,
                    text: 'Запланирован',
                    level: 'info'
                }
            } else if (order.dateTimeTo < now) {
                if (creditAmount > 0) {
                    return {
                        id: OrderStatus.NOT_PAID,
                        text: 'Не оплачен',
                        level: 'error'
                    }
                } else {
                    return {
                        id: OrderStatus.COMPLETED,
                        text: 'Ожидает закрытия',
                        level: 'warning'
                    }
                }
            }
        case 1:
            return {
                id: OrderStatus.CLOSED,
                text: 'Закрыт',
                level: 'success'
            }
        default:
            return {
                id: OrderStatus.CREATED,
                text: 'Создан',
                level: 'success'
            }
    }
}