import { useContext, createContext } from 'react'
import { RootStore } from 'entities/stores/rootStore'
import { UserStore } from 'entities/stores/user/userStore'
import { ProductStore } from 'entities/stores/product/productStore'
import { CalculationStore } from 'entities/stores/calculation/calculationStore'
import { RenderStore } from 'entities/stores/render/renderStore'
import { AccountStore } from 'entities/stores/account/accountStore'
import { PacksStore } from 'entities/stores/packs/packsStore'
import { OrdersListStore } from 'entities/stores/orderList/orderListStore'
import { OrderCardStore } from 'entities/stores/orderCard/orderCardStore'
import { MaterialsStore } from 'entities/stores/materials/materialsStore'
import { FilesStore } from 'entities/stores/files/filesStore'
import { PaymentsStore } from 'entities/stores/payments/paymentsStore'
import { OperationsStore } from 'entities/stores/operations/operationsStore'
import { OptionsStore } from 'entities/stores/options/optionsStore'
import { LogCalcsStore } from 'entities/stores/logCalcs/logCalcsStore'
import { ProductsListStore } from 'entities/stores/productsList'
import { VendorsStore } from 'entities/stores/vendors/vendorsStore'
import { MatOptionsStore } from 'entities/stores/matOptions/matOptionsStore'
import { EcoOptionsStore } from 'entities/stores/ecoOptions/ecoOptionsStore'
import { HistoryStore } from 'entities/stores/history/historyStore'

const RootContext = createContext<RootStore>(new RootStore())
const UserContext = createContext<UserStore>(new UserStore())
const ProductContext = createContext<ProductStore>(new ProductStore())
const CalculationContext = createContext<CalculationStore>(new CalculationStore())
const RenderContext = createContext<RenderStore>(new RenderStore())
const AccountContext = createContext<AccountStore>(new AccountStore())
const PacksContext = createContext<PacksStore>(new PacksStore())
const OrdersListContext = createContext<OrdersListStore>(new OrdersListStore())
const OrderCardContext = createContext<OrderCardStore>(new OrderCardStore())
const MaterialsContext = createContext<MaterialsStore>(new MaterialsStore())
const FilesContext = createContext<FilesStore>(new FilesStore())
const PaymentsContext = createContext<PaymentsStore>(new PaymentsStore())
const OperationsContext = createContext<OperationsStore>(new OperationsStore())
const OptionsContext = createContext<OptionsStore>(new OptionsStore())
const LogCalcsContext = createContext<LogCalcsStore>(new LogCalcsStore())
const ProductListContext = createContext<ProductsListStore>(new ProductsListStore())
const VendorsContext = createContext<VendorsStore>(new VendorsStore())
const MatOptionsContext = createContext<MatOptionsStore>(new MatOptionsStore())
const EcoOptionsContext = createContext<EcoOptionsStore>(new EcoOptionsStore())
const HistoryStoreContext = createContext<HistoryStore>(new HistoryStore())

export const useRootStore = (): RootStore => useContext(RootContext)
export const useUserStore = (): UserStore => useContext(UserContext)
export const useProductStore = (): ProductStore => useContext(ProductContext)
export const useCalculationStore = (): CalculationStore => useContext(CalculationContext)
export const useRenderStore = (): RenderStore => useContext(RenderContext)
export const useAccountStore = (): AccountStore => useContext(AccountContext)
export const usePacksStore = (): PacksStore => useContext(PacksContext)
export const useOrdersListStore = (): OrdersListStore => useContext(OrdersListContext)
export const useOrderCardStore = (): OrderCardStore => useContext(OrderCardContext)
export const useMaterialsStore = (): MaterialsStore => useContext(MaterialsContext)
export const useFilesStore = (): FilesStore => useContext(FilesContext)
export const usePaymentsStore = (): PaymentsStore => useContext(PaymentsContext)
export const useOperationsStore = (): OperationsStore => useContext(OperationsContext)
export const useOptionsStore = (): OptionsStore => useContext(OptionsContext)
export const useLogCalcStore = (): LogCalcsStore => useContext(LogCalcsContext)
export const useProductListStore = (): ProductsListStore => useContext(ProductListContext)
export const useVendorsStore = (): VendorsStore => useContext(VendorsContext)
export const useMatOptionsStore = (): MatOptionsStore => useContext(MatOptionsContext)
export const useEcoOptionsStore = (): EcoOptionsStore => useContext(EcoOptionsContext)
export const useHistoryStore = (): HistoryStore => useContext(HistoryStoreContext)
