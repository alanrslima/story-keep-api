import { DataSource } from "typeorm";
import { MysqlDataSource } from "../../common";
import { MemoryRepository } from "../application/contract/repository/memory-repository";
import { UnitOfWork } from "../application/contract/unit-of-work";

export class UnitOfWorkMysql implements UnitOfWork {
  public memoryRepository: MemoryRepository;
  private dataSource: DataSource;

  //   constructor(prisma: PrismaClient) {
  //     this.prisma = prisma;
  //     this.users = new UserRepository(prisma);
  //     this.products = new ProductRepository(prisma);
  //   }

  //   async execute(work: () => Promise<void>) {
  //     const tx = await this.prisma.$transaction(async (txClient) => {
  //       // Substituir repositórios para usarem txClient
  //       (this.users as any).setClient(txClient);
  //       (this.products as any).setClient(txClient);

  //       await work();
  //     });

  //     return tx;
  //   }

  // private pool: Pool;
  // private connection?: any;

  constructor(dataSource: DataSource, memoryRepository: MemoryRepository) {
    this.dataSource = dataSource;
    this.memoryRepository = memoryRepository;
  }

  async execute<T>(work: (manager: any) => Promise<T>): Promise<T> {
    return await this.dataSource.manager.transaction(async (manager) => {
      // Passa o manager para os repositórios
      // Executa o trabalho dentro da transação
      return work(manager);
    });
  }
}
