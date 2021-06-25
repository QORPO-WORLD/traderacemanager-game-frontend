import { BalanceService } from './../../services/balance.service';
import { BlockchainService, CarsService } from 'src/app/api/services';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from './../../../common/services/notify.service';
interface ConnectInfo {
  chainId: string;
}

import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import { AuthService } from 'src/app/user/services/auth.service';

const ethprovider = detectEthereumProvider();
const provider = new MetamaskProvider();
declare const ethereum: any;
declare const web3: any;

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


@Component({
  selector: 'app-meta-buy',
  templateUrl: './meta-buy.component.html',
  styleUrls: ['./meta-buy.component.scss'],
})
export class MetaBuyComponent implements OnInit, OnDestroy {


  username: string;
  email: string;
  agreeChecked = false;
  overlay = true;
  chainId = 137;
  @Input() amount: number;
  @Input() productIndex: number;
  @Input() assetType: string;
  chainSelected: string;
  @Input() tokenSelected: string;
  loading = false;
  claimSubscription: Subscription;
  transferSubscription: Subscription;
  claimed: boolean;
  ethMtfrckr = '0x';
  checkInterval: any;
  constructor(private notify: NotifyService, private blcksrvc: BlockchainService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    protected api: CarsService) { }

  ngOnInit() {
    if (window.ethereum) {
      this.enableMetamask()
      this.detectEth()
    }
  }

  ngOnDestroy() {
    if (this.claimSubscription) {
      this.claimSubscription.unsubscribe();
    }
    if (this.transferSubscription) {
      this.transferSubscription.unsubscribe();
    }
  }



  async enableMetamask() {
    if (!(await provider.isEnabled())) {
      //await provider.enable();
      this.getBalance();
    }
  }

  getBalance() {
    ethprovider.catch()
  }

  async detectEth() {
    if (ethprovider) {
      if (ethereum.isConnected()) {
        this.startApp();
      }
    } else {
      this.enableMetamask();
      this.detectEth();
    }
  }

  startApp() {
    this.getWalletAddress();
  }

  setChainId(id: number) {
    localStorage.setItem('chaind', JSON.stringify(id));
    this.chainId = id;
    this.setAddress();
  }

  getWalletAddress() {
    ethereum
      .request({ method: 'net_version' })
      .then((data) => this.setChainId(data))
      .catch((error) => {
        if (error.code === 4001) {
          this.notify.error('Please connect to MetaMask.');
        } else {
          this.notify.error(error);
        }
      });


  }

  setAddress() {
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((data) => this.signMessage(data))
      .catch((error) => {
        if (error.code === 4001) {
          this.notify.error('Please connect to MetaMask.');
        } else {
          this.notify.error(error);
        }
      });
  }

  signMessage(data) {
    const signer = data[0];
    this.ethMtfrckr = signer;
    const etherAmount = new Number(this.amount);
    //const weiValue = ethereum.toWei(etherAmount, 'ether');
   /*
   
    const thecontract = ethereum.contract(contractABI);

    const MyContract = thecontract.at('contract_address');

    MyContract.deposit({
      from: signer,
      gas: 0.1,
      value: etherAmount
    }, (err, result) => {
      result ? this.finalizeDeposit(result) : this.notify.error(err);
    });

    */
  }


  refresh() {
    window.location.reload();
  }

  finalizeDeposit(data) {
    console.log(data);
    this.loading = true;
    this.startDeposit();
  }

  startDeposit() {
  //  if (this.ethMtfrckr.length === 42) {
      this.claimSubscription = this.blcksrvc.makeDeposit({ from_address: this.ethMtfrckr, destination: 'races' }).subscribe(data => {
        console.log(data);
        this.checkClaim();
      });
   // }
  }

  checkClaim() {
    this.checkInterval = setInterval(() => {
      this.claim();
    }, 2000);
  }

  claim() {
    this.transferSubscription = this.blcksrvc.blockchainDepositCreate(
      {
        currency: this.tokenSelected,
        location: 'races'
      }
    ).subscribe(datax => {
      const data: any = datax;
      if (data.outstanding_amount > 0) {
        clearInterval(this.checkInterval);
        this.buyProduct(this.productIndex);
      }
    });
  }



  buyProduct(index: number) {
    if (this.assetType === "racer") {
      this.api
        .racerBuyList({
          tier: index,
          amount: this.amount,
          currency: this.tokenSelected,
        })
        .subscribe((datax) => {


          setTimeout(() => {
            this.notifyChangedBalance();
          }, 1000);
        });

      return;
    }
    if (this.assetType === "bundle") {
      this.buyPackageNfts(index);
      return;
    }
    this.api
      .carsBuyList({
        tier: index,
        amount: this.amount,
        currency: this.tokenSelected,
      })
      .subscribe((datax) => {

        setTimeout(() => {
          this.notifyChangedBalance();
        }, 1000);
      });
  }

  buyPackageNfts(index: number) {
    this.api
      .packageBuyList({
        package_id: index,
        amount: this.amount,
        currency: this.tokenSelected,
      })
      .subscribe((datax) => {
        setTimeout(() => {
          this.notifyChangedBalance();
        }, 1000);
      });
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
    this.overlay = false;
  }
}
