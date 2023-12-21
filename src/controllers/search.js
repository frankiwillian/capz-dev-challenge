const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data');

const equipmentsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'equipments.json'), 'utf8'));
const materialsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'materials.json'), 'utf8'));
const purchaseOrdersData = JSON.parse(fs.readFileSync(path.join(dataPath, 'purchase_orders.json'), 'utf8'));
const salesOrdersData = JSON.parse(fs.readFileSync(path.join(dataPath, 'sales_orders.json'), 'utf8'));
const workforceData = JSON.parse(fs.readFileSync(path.join(dataPath, 'workforce.json'), 'utf8'));

const search = (req, res) => {
    const termoBuscado = req.params.termo.toLowerCase();

    const resultadosEquipamentos = equipmentsData.filter(equipment => {
        return (
            equipment.EquipmentID.toLowerCase().includes(termoBuscado) ||
            equipment.EquipmentName.toLowerCase().includes(termoBuscado)
        );
    });

    const resultadosMateriais = materialsData.filter(material => {
        return (
            material.MaterialID.toLowerCase().includes(termoBuscado) ||
            material.MaterialName.toLowerCase().includes(termoBuscado)
        );
    });

    const resultadosOrdensCompra = purchaseOrdersData.filter(order => {
        return (
            order.MaterialID.toLowerCase().includes(termoBuscado) ||
            order.MaterialName.toLowerCase().includes(termoBuscado) ||
            order.Supplier.toLowerCase().includes(termoBuscado)
        );
    });

    const resultadosOrdensVenda = salesOrdersData.filter(order => {
        return (
            order.MaterialID.toLowerCase().includes(termoBuscado) ||
            order.MaterialName.toLowerCase().includes(termoBuscado) ||
            order.Customer.toLowerCase().includes(termoBuscado)
        );
    });

    const resultadosForcaTrabalho = workforceData.filter(worker => {
        return (
            worker.WorkforceID.toString().includes(termoBuscado) ||
            worker.Name.toLowerCase().includes(termoBuscado) ||
            worker.Shift.toLowerCase().includes(termoBuscado)
        );
    });

    const resultadosNormalizados = {
        equipamentos: resultadosEquipamentos.map(equipment => {
            return {
                id: equipment.EquipmentID,
                nome: equipment.EquipmentName
            };
        }),
        materiais: resultadosMateriais.map(material => {
            return {
                id: material.MaterialID,
                nome: material.MaterialName
            };
        }),
        ordensCompra: resultadosOrdensCompra.map(order => {
            return {
                id: order.PurchaseOrderID,
                dataEntrega: order.DeliveryDate,
                fornecedor: order.Supplier,
                material: {
                    id: order.MaterialID,
                    nome: order.MaterialName
                },
                quantidade: order.Quantity,
                custoTotal: order.TotalCost
            };
        }),
        ordensVenda: resultadosOrdensVenda.map(order => {
            return {
                id: order.SalesOrderID,
                dataEntrega: order.DeliveryDate,
                cliente: order.Customer,
                material: {
                    id: order.MaterialID,
                    nome: order.MaterialName
                },
                quantidade: order.Quantity,
                valorTotal: order.TotalValue
            };
        }),
        forcaTrabalho: resultadosForcaTrabalho.map(worker => {
            return {
                id: worker.WorkforceID,
                nome: worker.Name,
                turno: worker.Shift
            };
        })
    };

    res.json(resultadosNormalizados);
};

module.exports = { search };