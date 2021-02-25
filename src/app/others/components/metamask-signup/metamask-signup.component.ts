import { NotifyService } from './../../../common/services/notify.service';
interface ConnectInfo {
  chainId: string;
}



import { Component, OnInit } from '@angular/core';
import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import detectEthereumProvider from "@metamask/detect-provider";

const ethprovider = detectEthereumProvider();
const provider = new MetamaskProvider();
declare const ethereum: any;
@Component({
  selector: 'app-metamask-signup',
  templateUrl: './metamask-signup.component.html',
  styleUrls: ['./metamask-signup.component.scss'],
})
export class MetamaskSignupComponent implements OnInit {

  username: string;
  email: string;
  agreeChecked = false;
  overlay = true;
  constructor(private notify: NotifyService) { }

  ngOnInit() {
    if (window.ethereum) {
      this.enableMetamask()
      this.detectEth()
    }
  }



  async enableMetamask() {
    if (!(await provider.isEnabled())) {
      await provider.enable();
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
      this.notify.error('Please install MetaMask!');
    }
  }

  startApp() {
    this.getWalletAddress();
  }

  getWalletAddress() {
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
    console.log(signer);
    const msgParams = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
          { name: 'salt', type: 'string' }
        ],
        Msg: [
          { name: 'text', type: 'string' },
        ]
      },
      domain: {
        name: 'IOI-GAME',
        version: '2.0',
        chainId: 1,
        verifyingContract: '0x8B3870Df408fF4D7C3A26DF852D41034eDa11d81',
        salt: 'randomstringgg'
      },
      primaryType: 'Msg',
      message: {
        text: 'Wallet authentication',
      }

    };

    /*
    
        let domain = [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" }
        ]
    
        let mail = [
          { "name": 'content', "type": 'string' },
        ]
    
        let domainData = {
          name: 'IOI-GAME',
          version: '2.0',
          chainId: 1
        }
    
        let message = {
          content: 'This is the mail content'
        }
    
        let eip712TypedData = {
          types: {
            EIP712Domain: domain,
            Mail: mail
          },
          domain: domainData,
          primaryType: "Mail",
          message: message
        }
    
    
    
        let dataTyped = JSON.stringify(eip712TypedData)
    */
    const domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
      { name: 'salt', type: 'string' }
    ];

    const domainData = {
      name: 'IOI-GAME',
      version: '2.0',
      chainId: 1,
      verifyingContract: '0x8B3870Df408fF4D7C3A26DF852D41034eDa11d81',
      salt: 'randomstringgg'
    };
    var message = {
      text: 'Wallet authentication',
    };

    const datas = JSON.stringify({
      types: {
        EIP712Domain: domain,
        Msg: [
          { name: 'text', type: 'string' },
        ]
      },
      domain: domainData,
      primaryType: "Msg",
      message: message
    });

    ethereum
      .sendAsync({
        method: 'eth_signTypedData_v3',
        params: [signer, datas],
        from: signer
      },
        (err, result) => {
          result ? this.finalizeLogin(result) : this.notify.error(err);
        }
      );
    /*
      .then((result) => {
        this.finalizeLogin(result);
      })
      .catch((error) => {
        console.log(error);
      });
*/
  }

  finalizeLogin(data) {
    if (data.result) {
      const magic = JSON.stringify(data.result);
      localStorage.setItem('mmea', magic);
      //this.notify.error(magic + ' address associated, finish sign up process now.');
      this.overlay = false;
    }
  }




}
